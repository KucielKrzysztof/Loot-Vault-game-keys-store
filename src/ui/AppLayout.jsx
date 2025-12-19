import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function AppLayout() {
	return (
		<>
			<div className="h-dvh bg-background flex flex-col items-center">
				<NavBar />
				<main className="h-full w-full overflow-y-auto overflow-x-hidden flex flex-col gap-15">
					<Outlet />
					<div className="h-auto w-full">Footer</div>
				</main>
			</div>
		</>
	);
}

export default AppLayout;
