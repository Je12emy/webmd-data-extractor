import { data } from "@/data";
import { useVelocityWizardStore } from "@/routes/velocity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "./ui/button";
import { Form, FormField } from "./ui/form";
import { MultiSelect, type MultiSelectOption } from "./ui/muilti-select";

const schema = z.object({
	members: z.array(z.string()).min(1, "Select at least one member"),
});

type Values = z.infer<typeof schema>;

type Props = {
	boardId: number;
};

export function MembersForm({ boardId }: Props) {
	const form = useForm<Values>({
		resolver: zodResolver(schema),
	});
	const updateData = useVelocityWizardStore((state) => state.updateData);

	const board = data.boards.find((x) => x.id === boardId);

	if (!board) {
		return (
			<div className="text-center bg-slate-800/50 rounded-lg border border-slate-600/50 p-6">
				<div className="text-red-400 text-lg font-medium mb-2">Board Not Found</div>
				<p className="text-slate-300">The selected board could not be found.</p>
				<Button type="button" variant="outline" className="text-slate-300 hover:text-white">
					<Link to="/velocity/board">← Back</Link>
				</Button>
			</div>
		);
	}

	const options: MultiSelectOption[] = board.members.map(({ displayName, key }) => ({
		label: displayName,
		value: key,
	}));

	const onSubmit: SubmitHandler<Values> = (data) => {
		updateData({ members: data.members });
		// Navigate to results or next step
		console.log("Form submitted with members:", data.members);
	};

	return (
		<div className="space-y-8">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="members"
							render={({ field }) => (
								<div className="space-y-2">
									<div className="block text-sm font-medium text-slate-200 mb-2">
										Team Members
									</div>
									<MultiSelect
										options={options}
										onValueChange={field.onChange}
										placeholder="Select team members..."
									/>
									{form.formState.errors.members && (
										<p className="text-red-400 text-sm mt-1">
											{form.formState.errors.members.message}
										</p>
									)}
								</div>
							)}
						/>
					</div>

					<div className="flex justify-between items-center pt-4">
						<Button type="button" variant="ghost" className="text-slate-300 hover:text-white">
							<Link to="/velocity/board">← Back</Link>
						</Button>
						<Button
							type="submit"
							variant="outline"
							className="px-8 py-2 bg-gradient-to-br from-blue-600/20 to-blue-800/20 hover:from-blue-700/50 hover:to-blue-900/50 border-blue-500/30 hover:border-blue-400/50 text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
						>
							<Link to="/velocity/sprints">Next</Link>
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
