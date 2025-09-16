import { BoardForm } from "@/components/BoardForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/velocity/board")({
	component: RouteComponent,
});

function RouteComponent() {
	return <BoardForm />;
}
