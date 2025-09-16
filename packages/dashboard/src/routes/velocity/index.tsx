import { Button } from "@/components/ui/button";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { create } from "zustand";

const schema = z.object({
	boardId: z.number().optional(),
	members: z.array(z.string()).optional(),
});

type velocityWizard = z.infer<typeof schema>;

interface velocityWizardState {
	data: velocityWizard;
	updateData: (newData: velocityWizard) => void;
}

export const useVelocityWizardStore = create<velocityWizardState>()((set) => ({
	data: {},
	updateData: (newData: velocityWizard) => set((state) => ({ data: { ...state.data, ...newData } })),
}));

export const Route = createFileRoute("/velocity/")({
	component: RouteComponent,
	validateSearch: schema,
});

function RouteComponent() {
	return (
		<article className="text-white max-w-4xl mx-auto px-6 py-12">
			<header className="text-center mb-8">
				<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
					Velocity Report
				</h1>
				<p className="text-xl text-slate-300 max-w-2xl mx-auto">
					Configure your velocity report parameters to analyze team performance and sprint metrics
				</p>
			</header>

			<section className="text-center">
				<div className="max-w-xs mx-auto">
					<div className="group">
						<Button
							className="w-full h-16 bg-gradient-to-br from-blue-600/20 to-blue-800/20 hover:from-blue-700/50 hover:to-blue-900/50 border-blue-500/30 hover:border-blue-400/50 text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
							variant="outline"
						>
							<Link to={"/velocity/board"}>
								<div className="text-lg font-semibold text-white group-hover:text-blue-50 transition-all duration-300">
									Start Configuration
								</div>
							</Link>
						</Button>
					</div>
				</div>
			</section>

			<div className="mt-8">
				<Outlet />
			</div>
		</article>
	);
}
