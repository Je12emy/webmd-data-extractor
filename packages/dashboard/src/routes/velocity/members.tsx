import { MembersForm } from "@/components/MembersForm";
import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useVelocityWizardStore } from ".";

export const Route = createFileRoute("/velocity/members")({
	component: RouteComponent,
});

function RouteComponent() {
	const { boardId } = useVelocityWizardStore((state) => state.data);

	if (!boardId) {
		return (
			<article className="text-white max-w-2xl mx-auto px-6 py-8">
				<div className="text-center bg-slate-700/50 rounded-lg border border-slate-600/50 p-8">
					<div className="text-red-400 text-lg font-medium mb-2">No Board Selected</div>
					<p className="text-slate-300">Please go back and select a project board first.</p>
					<Button type="button" variant="ghost" className="text-slate-300 hover:text-white">
						<Link to="/velocity/board">← Back</Link>
					</Button>
				</div>
			</article>
		);
	}

	return (
		<article className="text-white max-w-2xl mx-auto px-6 py-8">
			<header className="text-center mb-12">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
					Select Team Members
				</h1>
				<p className="text-lg text-slate-300">
					Choose the team members to include in your velocity report
				</p>
			</header>

			<section className="bg-slate-700/50 rounded-lg border border-slate-600/50 p-8">
				<MembersForm boardId={boardId} />
			</section>
		</article>
	);
}
