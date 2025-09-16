import { MembersForm } from "@/components/MembersForm";
import { createFileRoute } from "@tanstack/react-router";
import { useVelocityWizardStore } from ".";

export const Route = createFileRoute("/velocity/members")({
	component: RouteComponent,
});

function RouteComponent() {
	const { boardId } = useVelocityWizardStore((state) => state.data);

	if (!boardId) {
		return <div>No board selected</div>;
	}

	return <MembersForm boardId={boardId} />;
}
