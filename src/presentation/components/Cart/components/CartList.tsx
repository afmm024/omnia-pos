import { Box, Divider, rem, ScrollArea, Text } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { CartItem, useCartStore } from "@/domain/store/CartStore";
import CartItemCard from "./CartItem";

export default function CartList() {
    const LIST_MAX_HEIGHT = "600px";
    const items = useCartStore((state) => state.items);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    
    const sortItems = useMemo(() => {
        return [...cartItems].reverse();
    },[cartItems])

    useEffect(() => {
        setCartItems(items);
    }, [items])
    return (
        <>
            {
                cartItems.length > 0 ? <ScrollArea h={LIST_MAX_HEIGHT}>
                    {sortItems.map((item, index) => {
                        return <React.Fragment key={index}>
                            <CartItemCard
                                item={item}
                                onUpdateQuantity={updateQuantity}
                            />
                            {index < cartItems.length - 1 && <Divider />}
                        </React.Fragment>
                    })}
                </ScrollArea> : <Box >
                    <Text c="dimmed" mt="xl" ta={"center"} size="md">
                        No hay productos en el carrito
                    </Text>
                </Box>
            }

        </>

    )
}