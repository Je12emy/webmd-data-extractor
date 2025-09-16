import { data } from "@/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormField } from "./ui/form";
import { MultiSelect, type MultiSelectOption } from "./ui/muilti-select";
import { SelectItem } from "./ui/select";

const schema = z.object({
	members: z.array(z.string()).min(1, "Select at least one member"),
});

type Props = {
	boardId: number;
};

export function MembersForm({ boardId }: Props) {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});

	const board = data.boards.find((x) => x.id === boardId);

	if (!board) {
		return <div>Board not found</div>;
	}

	const options: MultiSelectOption[] = board.members.map(({ displayName, key }) => ({
		label: displayName,
		value: key,
	}));

	return (
		<Form {...form}>
			<form>
				<FormField
					control={form.control}
					name="members"
					render={({ field }) => <MultiSelect options={options} onValueChange={field.onChange} />}
				/>
			</form>
		</Form>
	);
}
