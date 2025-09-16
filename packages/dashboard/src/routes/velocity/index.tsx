import { Button } from "@/components/ui/button";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { create } from "zustand";

const schema = z.object({
	boardId: z.number().optional(),
	members: z.array(z.string()).optional(),
});

type velocityWizard = z.infer<typeof schema>;

interface velocityWizardState {
	data: velocityWizard;
	updateData: (newData: velocityWizard) => void;
}

export const useVelocityWizardStore = create<velocityWizardState>()((set) => ({
	data: {},
	updateData: (newData: velocityWizard) => set((state) => ({ data: { ...state.data, ...newData } })),
}));

export const Route = createFileRoute("/velocity/")({
	component: RouteComponent,
	validateSearch: schema,
});

function RouteComponent() {
	return (
		<div>
			<h1>Velocity Report</h1>
			<Button>Start</Button>
		</div>
	);
}
