import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<>
			<header className="">
				<h1>Report Builder</h1>
			</header>
			<section>
				<h1>Pick a Report Wizard</h1>
				<Button variant="outline">Velocity Report</Button>
				<Button variant="outline">Completion Report</Button>
			</section>
		</>
	);
}
