import { zodResolver } from "@hookform/resolvers/zod";
import type { SprintData } from "@jira-data/core";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormField } from "./ui/form";
import { MultiSelect, type MultiSelectProps } from "./ui/muilti-select";

const schema = z.object({
	sprintId: z.array(z.string()),
});

type values = z.infer<typeof schema>;

type FormProps = {
	options: SprintData[];
};

export function SprintPickerForm({ options }: FormProps) {
	const form = useForm<values>({
		resolver: zodResolver(schema),
	});

	return (
		<Form {...form}>
			<form>
				<FormField
					name="sprintId"
					control={form.control}
					render={({ field }) => <SprintPicker options={options} onValueChange={field.onChange} />}
				/>
			</form>
		</Form>
	);
}

type SprintPickerProps = {
	options: SprintData[];
} & Omit<MultiSelectProps, "options">;

export function SprintPicker({ options, ...props }: SprintPickerProps) {
	return <MultiSelect options={options.map((s) => ({ label: s.name, value: s.id.toString() }))} {...props} />;
}
