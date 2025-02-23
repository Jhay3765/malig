import ProteinForm from "./components/Protein-Form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to MaligNet</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>AI-Powered Patient Risk Assessment</CardTitle>
          <CardDescription>
            MaligNet helps doctors assess patient risk factors and provides
            detailed insights using advanced AI technology.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Our application allows doctors to input crucial patient data,
            including protein values, hormone receptor statuses, and demographic
            information. Based on this data, our AI system generates a
            comprehensive report on the patient's risk factors and other
            relevant details.
          </p>
          <p>
            To get started, simply fill out the form below with your patient's
            information. Once submitted, you'll receive an AI-generated response
            with valuable insights to aid in your diagnosis and treatment
            planning.
          </p>
        </CardContent>
      </Card>
      <ProteinForm />
    </div>
  );
}
