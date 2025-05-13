import StoreProvider from "@/redux/StoreProvider"

export default function AppProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return <StoreProvider>{children}</StoreProvider>
}
