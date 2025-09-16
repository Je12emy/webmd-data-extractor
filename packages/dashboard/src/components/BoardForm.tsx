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
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="board"
					render={({ field }) => (
						<Select onValueChange={field.onChange}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Team Board" />
							</SelectTrigger>
							<SelectContent>
								{boards.map(({ id, name }) => (
									<SelectItem key={id} value={id.toString()}>
										{name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				/>
				<Button type="submit">Next</Button>
			</form>
		</Form>
	);
}
