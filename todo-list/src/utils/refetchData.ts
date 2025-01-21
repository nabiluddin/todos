import { revalidate } from "@solidjs/router"

const refetchData = async (cachedKey: string): Promise<void> => {
  return await revalidate(cachedKey)
}
export default refetchData;