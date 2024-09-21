'use client'
import { PageHeader } from "./components/PageHeader"

 // Error components must be Client Components
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <PageHeader>Something went wrong!</PageHeader>
      <br/>
      <h3>An unexpected error occured. Please contact an administrator for further assistance at&nbsp; 
        <a href="mailto:admin@thereadingcorner.uk">admin@thereadingcorner.uk</a>.
      </h3>
      <br/>
      <h3>Error: {`${error}`}</h3>
      <br/>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}