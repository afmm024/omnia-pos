import { create } from 'zustand';
import qz from 'qz-tray';

const CERT_API = '/api/qz/cert';
const SIGN_API = '/api/qz/sign';

interface QZTrayState {
    isConnected: boolean;
    printers: string[];
    defaultPrinter: string | null;
    sizePaper: string | null;
    error: string | null;
    connect: () => Promise<void>;
    printData: (printerName: string, data: any) => Promise<void>;
    disconnect: () => void;
    setDefaultPrinter: (printerName: string) => void;
    setSizePaper: (size: string) => void;
}

const setupSecurity = () => {
    qz.security.setCertificatePromise((resolve, reject) => {
        fetch(CERT_API)
            .then(res => res.text())
            .then(resolve)
            .catch(reject);
    });
    qz.security.setSignatureAlgorithm("SHA512");
    qz.security.setSignaturePromise((toSign) => {
        return (resolve, reject) => {
            fetch(`${SIGN_API}?message=${encodeURIComponent(toSign)}`)
                .then(res => res.text())
                .then(resolve)
                .catch(reject);
        };
    });
};

export const useQZTrayStore = create<QZTrayState>((set, get) => ({
    isConnected: false,
    printers: [],
    defaultPrinter: null,
    sizePaper: null,
    error: null,
    setDefaultPrinter: (printerName) => {
        set({ defaultPrinter: printerName });
    },
    setSizePaper: (size) => {
        set({ sizePaper: size });
    },
    connect: async () => {
        if (get().isConnected) return;
        set({ error: null });
        try {
            setupSecurity();
            await qz.websocket.connect();
            set({ isConnected: true });
            console.log('QZ Tray: Conexión establecida y validada.');
            const printerList = await qz.printers.find() as string[];
            set({ printers: printerList });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Fallo desconocido en QZ Tray.";
            set({
                isConnected: false,
                error: errorMessage
            });
            qz.websocket.disconnect().catch(() => { });
        }
    },

    printData: async (printerName, data) => {
        if (!get().isConnected) {
            throw new Error("QZ Tray no está conectado. No se puede imprimir.");
        }
        const dataRaw = [{
            type: 'raw',
            format: 'command',
            flavor: 'base64',
            data: data,
            options: {
                encoding: 'CP850'
            }
        }];

        const config = qz.configs.create(printerName);
        return qz.print(config, dataRaw as any);
    },

    disconnect: () => {
        qz.websocket.disconnect().catch(() => { });
        set({ isConnected: false, printers: [], error: null });
        console.log('QZ Tray: Desconectado.');
    }
}));