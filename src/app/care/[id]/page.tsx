import { notFound } from "next/navigation";
import CareProfileContent from "./CareProfileContent";

interface CareProfile {
  id: string;
  name: string;
  age: number;
  address: string;
  preferences: string[];
}

// Mock data for initial profiles
const initialCareProfiles: Record<string, CareProfile> = {
  "margaret-wilson": {
    id: "margaret-wilson",
    name: "Margaret Wilson",
    age: 75,
    address: "123 Maple Street, Riverside, CA 92501",
    preferences: [
      "Prefers to take medication with meals",
      "Enjoys classical music during morning routine",
      "Needs assistance with mobility",
    ],
  },
  "robert-wilson": {
    id: "robert-wilson",
    name: "Robert Wilson",
    age: 78,
    address: "456 Oak Avenue, Riverside, CA 92501",
    preferences: [
      "Diabetic diet - no sugar",
      "Likes to walk in the garden after lunch",
      "Needs reading glasses for activities",
    ],
  },
};

export default function CareProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const profile = initialCareProfiles[params.id];

  if (!profile) {
    notFound();
  }

  return <CareProfileContent initialProfile={profile} />;
}
