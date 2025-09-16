import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<article className="text-white max-w-4xl mx-auto px-6 py-12">
			<header className="text-center mb-16">
				<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
					Report Builder
				</h1>
				<p className="text-xl text-slate-300 max-w-2xl mx-auto">
					Generate comprehensive reports and insights from your project data
				</p>
			</header>

			<section className="text-center">
				<h2 className="text-3xl font-semibold mb-12 text-slate-100">Choose Your Report Type</h2>

				<div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
					<div className="group">
						<Button
							className="w-full h-32 bg-gradient-to-br from-blue-600/20 to-blue-800/20 hover:from-blue-700/50 hover:to-blue-900/50 border-blue-500/30 hover:border-blue-400/50 text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
							variant="outline"
						>
							<Link to="/velocity">
								<div className="flex flex-col items-center gap-3">
									<div className="w-8 h-8 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 flex items-center justify-center transition-all duration-300">
										<span className="text-blue-300 group-hover:text-blue-100 font-bold transition-all duration-300">
											V
										</span>
									</div>
									<div>
										<div className="text-lg font-semibold text-white group-hover:text-blue-50 transition-all duration-300">
											Velocity Report
										</div>
										<div className="text-sm text-slate-200 group-hover:text-slate-100 transition-all duration-300">
											Track team performance
										</div>
									</div>
								</div>
							</Link>
						</Button>
					</div>

					<div className="group">
						<Button
							className="w-full h-32 bg-gradient-to-br from-purple-600/20 to-purple-800/20 hover:from-purple-700/50 hover:to-purple-900/50 border-purple-500/30 hover:border-purple-400/50 text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
							variant="outline"
						>
							<div className="flex flex-col items-center gap-3">
								<div className="w-8 h-8 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 flex items-center justify-center transition-all duration-300">
									<span className="text-purple-300 group-hover:text-purple-100 font-bold transition-all duration-300">
										C
									</span>
								</div>
								<div>
									<div className="text-lg font-semibold text-white group-hover:text-purple-50 transition-all duration-300">
										Completion Report
									</div>
									<div className="text-sm text-slate-200 group-hover:text-slate-100 transition-all duration-300">
										Analyze project progress
									</div>
								</div>
							</div>
						</Button>
					</div>
				</div>
			</section>
		</article>
	);
}
