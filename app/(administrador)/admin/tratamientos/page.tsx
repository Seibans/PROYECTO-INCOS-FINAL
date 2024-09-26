import ApointmentScheduler from "@/components/otros/appointment-scheduler";
import { Charts } from "@/components/otros/componente-date-time";
import DigitalTransformationScheduler from "@/components/otros/digital-transformation-scheduler";
import { FooterNav } from "@/components/otros/footerNav";
import ModernClientProfile from "@/components/otros/modern-client-profile";
import { TimePicker } from "@/components/otros/timePicker";

export default function TratamientosPage() {
	return (
		<div className="w-full">
			<ApointmentScheduler />
			<DigitalTransformationScheduler />
			{/* <FooterNav/> */}
			{/* <ModernClientProfile /> */}
			<TimePicker />
		</div>
	)
}
