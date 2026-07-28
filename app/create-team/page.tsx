import CreateTeamForm from "@/components/create-team-form"

export default function CreateTeamPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Create a Team</h1>
      <CreateTeamForm />
    </div>
  )
}