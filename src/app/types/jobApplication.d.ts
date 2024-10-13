type jobApplication = {
  id: number,
  name: string,
  email: string,
  motivation: string,
  resumeUrl: string,
  createdAt: Date,
  status: "accepted" | "rejected" | "pending",
  jobOffer: JobOffer,
}