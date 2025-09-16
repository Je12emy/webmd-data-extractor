import { BoardForm } from "@/components/BoardForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/velocity/board")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<article className="text-white max-w-2xl mx-auto px-6 py-8">
			<header className="text-center mb-12">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
					Select Board
				</h1>
				<p className="text-lg text-slate-300">Choose the project board for your velocity report</p>
			</header>

			<section className="bg-slate-700/50 rounded-lg border border-slate-600/50 p-8">
				<BoardForm />
			</section>
		</article>
	);
}
