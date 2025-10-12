import BillsPage from "@/presentation/pages/Bills/Bills";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
      const { id } = await (params)

      return (
        <>
          <BillsPage shift={id} />
        </>
      );
    }