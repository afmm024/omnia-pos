import { ImageResources } from "@/presentation/config/resources";
import { Image } from "@mantine/core";

type Props = {
    size?: number
}

export default function Logo({ size = 120 }: Props) {

    return (
        <Image alt="logo omnia" w={size} fit="contain" src={ImageResources.omnia} />
    )
}