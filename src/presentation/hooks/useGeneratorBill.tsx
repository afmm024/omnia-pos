import { ReceiptInformation } from '@/domain/types/ReceiptType';
import React from 'react';
import { Br, Cut, Line, Printer, Text, Row, render, QRCode, Image } from 'react-thermal-printer';
import { ImageResources } from '../config/resources';
import { formatColombianMoney } from '../helpers/priceUtils';
import { transforms } from '@react-thermal-printer/image';



function uint8ArrayToBase64(uint8Array: Uint8Array): string {
    const binaryString = Array.from(uint8Array, byte => String.fromCharCode(byte)).join('');
    return btoa(binaryString);
}

export const useThermalReceipt = () => {

    const generatePrintDataDian = async (data: ReceiptInformation) => {
        const itemRows = data.items.map((item, index) => (
           <Row 
                left={<Text align='left'>{item.quantity} X {item.name}</Text>}
                right={<Text align='right'>${item.price }</Text>}
           />
        ));

        const totalItemsRow = <Row left={`${data.totalItems} Items`} right="" />;

        const receipt = (
            <Printer type="epson" width={32} characterSet="pc850_multilingual">
                
                <Image align="center" src={ImageResources.logoBill} transforms={[transforms.floydSteinberg]}/>
                <Br />
                <Text align="center" size={{ width: 1, height: 2 }}>{data.companyInformation.graphic_representation_name}</Text> 
                <Text align="center">{data.companyInformation.nit}</Text>
                <Text align="center">{data.companyInformation.direction}</Text>
                <Text align="center">{data.companyInformation.phone}</Text>
                <Line />

                {/* INFORMACIÓN DE LA FACTURA */}
                <Text align='center'>INFORMACION DE FACTURA</Text>
                <Br />
                <Text align="left">No. Factura</Text>
                <Text align="left">{data.billInformation?.bill.number ?? ""}</Text>
                <Text align='left'>Fecha de emision</Text>
                <Text align='left'>{data.billInformation?.bill.created_at ?? ""}</Text>
                <Text align='left'>Fecha de validacion</Text>
                <Text align='left'>{data.billInformation?.bill.validated ?? ""}</Text>
                <Line />
                <Text align='center'>INFORMACION DE CLIENTE</Text>
                <Br />
                <Row left="Cliente:" right={data.supplierInformation.name} />
                <Row left="Id:" right={data.supplierInformation.document} />
                <Row left="Telefono:" right={data.supplierInformation.phone} />
                <Row left="Email:" right={data.supplierInformation.email} />
                <Line />

                {/* DETALLE DE PRODUCTOS - Encabezado */}
                <Row left="CAN. DESCRIPCION" right="VALOR" />
                <Line />

                {/* DETALLE DE PRODUCTOS - Ítems DINÁMICOS */}
                {itemRows}
                <Br />
                {totalItemsRow}
                <Line />

                {/* TOTALES */}
                <Row left="" right="TOTAL" />
                    <Text align="right" size={{ width: 2, height: 2 }}>{formatColombianMoney(data.total)}</Text> 
                <Br />
                <Row left="Forma pago" right={data.paymentType} />
                <Line />

                <Row left="Impuestos incluidos" right="Base" />
                <Row left="IMPOCONSUMO 8%" right={formatColombianMoney(data.subTotal)} />
                <Row left="" right={formatColombianMoney(data.taxes)} /> 
                <Line />

                {/* INFORMACIÓN LEGAL/DIAN */}
                <Text align="center">Resolucion {data.billInformation?.numbering_range.resolution_number}</Text>
                <Text align="center">Desde {data.billInformation?.numbering_range.start_date}</Text>
                <Text align="center">Hasta {data.billInformation?.numbering_range.end_date}</Text>
                <Text align="center">Rango</Text>
                <Text align="center">Desde{data.billInformation?.numbering_range.from} hasta {data.billInformation?.numbering_range.to}</Text>
                <Br />

                <Line />

                <Br />
                {/* CÓDIGO QR - Usando el componente con la configuración ajustada para 58mm */}
                <QRCode 
                    content={data.billInformation?.bill.qr ?? ""} 
                    cellSize={4}     // Tamaño del módulo muy pequeño para la URL en 58mm
                    correction="L"  // Nivel Bajo para reducir tamaño físico
                    model="model2"
                    align="center"
                />
                <Br />
                
                <Text align="center">CUFE</Text>
                <Text align="center">{data.billInformation?.bill.cufe}</Text>
                <Br />
                <Line />
                <Text align="center">Impreso por OmniaPOS</Text>
                <Cut />
            </Printer>
        );
        const uint8Data: Uint8Array = await render(receipt);
        const base64Data: string = uint8ArrayToBase64(uint8Data);
        return base64Data;
    };

    return { generatePrintDataDian };
};