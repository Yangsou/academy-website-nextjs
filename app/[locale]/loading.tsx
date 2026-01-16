export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return (
    <div
      style={{
        background: '#000',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
    >
      Loading
    </div>
  )
}
