import { SprintPickerForm } from "@/components/SprintPicker";
import { data } from "@/data";
import { Board, Jira } from "@jira-data/core";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useVelocityWizardStore } from ".";

export const Route = createFileRoute("/velocity/sprints")({
	component: RouteComponent,
});

const jira = new Jira(data.jira.host, data.jira.token);

function RouteComponent() {
	const { boardId } = useVelocityWizardStore((state) => state.data);
	const { data, isLoading } = useQuery({
		queryKey: ["board", boardId],
		queryFn: async () => {
			if (!boardId) return null;

			return await Board.Initialize(boardId, "Demo Board", jira);
		},
	});

	if (!boardId) {
		return <div> No board selected </div>;
	}

	if (isLoading) {
		return <div> Loading... </div>;
	}

	if (!data) {
		return <div> No data </div>;
	}

	return (
		<div>
			<SprintPickerForm options={data.sprints} />
		</div>
	);
}
