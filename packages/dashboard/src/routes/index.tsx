import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createFileRoute } from "@tanstack/react-router";
import data from "../../../../config.json";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="text-center">
			<header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Team Board" />
					</SelectTrigger>
					<SelectContent>
						{data.boards.map(({ id, name }) => (
							<SelectItem key={id} value={name}>
								{name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</header>
		</div>
	);
}
