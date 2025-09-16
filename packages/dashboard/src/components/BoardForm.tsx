import { data } from "@/data";
import { useVelocityWizardStore } from "@/routes/velocity";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "./ui/button";
import { Form, FormField } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const schema = z.object({
	board: z.string(),
});

type Values = z.infer<typeof schema>;
const { boards } = data;

export function BoardForm() {
	const form = useForm<Values>({
		resolver: zodResolver(schema),
	});
	const updateData = useVelocityWizardStore((state) => state.updateData);
	const navigate = useNavigate({ from: "/velocity/board" });

	const onSubmit: SubmitHandler<Values> = (data) => {
		updateData({ boardId: Number(data.board) });
		navigate({ to: "/velocity/members" });
	};

	return (
		<div className="space-y-8">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="board"
							render={({ field }) => (
								<div className="space-y-2">
									<label
										htmlFor="board-select"
										className="block text-sm font-medium text-slate-200"
									>
										Project Board
									</label>
									<Select onValueChange={field.onChange}>
										<SelectTrigger
											id="board-select"
											className="w-full h-12 bg-slate-800/50 border-slate-500/50 text-white focus:border-blue-400/50 focus:ring-blue-400/20"
										>
											<SelectValue placeholder="Select a team board..." />
										</SelectTrigger>
										<SelectContent className="bg-slate-800 border-slate-600">
											{boards.map(({ id, name }) => (
												<SelectItem
													key={id}
													value={id.toString()}
													className="text-white hover:bg-slate-700 focus:bg-slate-700"
												>
													{name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							)}
						/>
					</div>

					<div className="flex justify-end pt-4">
						<Button
							type="submit"
							variant="outline"
							className="px-8 py-2 bg-gradient-to-br from-blue-600/20 to-blue-800/20 hover:from-blue-700/50 hover:to-blue-900/50 border-blue-500/30 hover:border-blue-400/50 text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
						>
							Continue
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
