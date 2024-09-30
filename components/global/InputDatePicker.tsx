import React from "react";
import Datepicker from "tailwind-datepicker-react";
import { ArrowBigRight, ArrowBigLeft } from "lucide-react";

interface DatePickerProps {
    onChange: (date: Date) => void;
    value: Date | undefined;
    maxDate: Date;
    minDate: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({ onChange, value, maxDate, minDate }) => {
    const [show, setShow] = React.useState(false);

    const handleChange = (selectedDate: Date) => {
        onChange(selectedDate);
    };

    const handleClose = (state: boolean) => {
        setShow(state);
    };

    return (
        <Datepicker
            options={{
                autoHide: true,
                todayBtn: false,
                clearBtn: true,
                todayBtnText: "Hoy",
                clearBtnText: "Desmarcar",
                maxDate: maxDate || new Date(),
                minDate: minDate || new Date("2000-01-01"),
                theme: {
                    background: "",
                    todayBtn: "bg-gradient",
                    clearBtn: "",
                    icons: "",
                    text: "",
                    disabledText: "opacity-25",
                    input: "",
                    inputIcon: "",
                    selected: "bg-gradient",
                },
                icons: {
                    prev: () => <ArrowBigLeft />,
                    next: () => <ArrowBigRight />,
                },
                datepickerClassNames: "left-2 sm:left-12 top-60",
                language: "es",
                disabledDates: [],
                weekDays: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
                inputNameProp: "date",
                inputIdProp: "date",
                inputPlaceholderProp: "Selecciona una Fecha",
            }}
            onChange={handleChange}
            show={show}
            setShow={handleClose}
        />
    );
};

