import Container from "@/components/Container"
import { SafeRservations, SafeUser } from "../types"
import Heading from "@/components/Heading"

interface TripsClientProps {
  reservations: SafeRservations[]
  currentUser: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  return (
    <Container>
      <Heading 
      title="Trips"
      subtitle="Where you've beend and where you're going"
      />
    </Container>
  )
}

export default TripsClient