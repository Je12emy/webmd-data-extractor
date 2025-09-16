import { Form, FormField } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import data from "../../../../config.json";

export const Route = createFileRoute("/")({
	component: App,
});

const FormSchema = z.object({
	board: z.string(),
});

function App() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	return (
		<div className="text-center">
			<header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
				<Form {...form}>
					<form>
						<FormField
							control={form.control}
							name="board"
							render={(field) => (
								<Select {...field}>
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
							)}
						/>
					</form>
				</Form>
			</header>
		</div>
	);
}
