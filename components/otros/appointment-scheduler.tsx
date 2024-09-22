'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | undefined>('12-am')
  const [showTimeSlots, setShowTimeSlots] = useState(false)

  const timeSlots = [
    '10-am', '10-30-am', '11-am', '11-30-am', '12-am', '12-30-pm',
    '1-pm', '1-30-pm', '2-pm', '2-30-pm', '3-pm', '3-30-pm'
  ]

  const formatTime = (time: string) => {
    const [hour, period] = time.split('-')
    return `${hour.padStart(2, '0')}:${period.includes('30') ? '30' : '00'} ${period.slice(-2).toUpperCase()}`
  }

  const handleSave = () => {
    console.log('Appointment scheduled for:', selectedDate, 'at', selectedTime)
    setIsOpen(false)
  }

  const toggleTimeSlots = () => {
    setShowTimeSlots(!showTimeSlots)
  }

  return (
    <>
      <Button
        variant="outline"
        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
        onClick={() => setIsOpen(true)}
      >
        <svg className="w-4 h-4 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
        </svg>
        Schedule appointment
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule an appointment</DialogTitle>
          </DialogHeader>
          <div className="p-4 pt-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border mx-auto sm:mx-0 flex justify-center my-5"
            />
            <Button
              onClick={toggleTimeSlots}
              variant="outline"
              className="w-full justify-between"
            >
              <span>Pick your time</span>
              {showTimeSlots ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
            {showTimeSlots && (
              <RadioGroup
                value={selectedTime}
                onValueChange={setSelectedTime}
                className="grid w-full grid-cols-3 gap-2 mt-2"
              >
                {timeSlots.map((time) => (
                  <div key={time} className="relative">
                    <RadioGroupItem
                      value={time}
                      id={time}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={time}
                      className="flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 peer-checked:border-blue-700 dark:peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900 dark:peer-checked:text-blue-500"
                    >
                      {formatTime(time)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Discard</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}