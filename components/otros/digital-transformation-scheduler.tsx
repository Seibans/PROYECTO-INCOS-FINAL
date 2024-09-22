'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

export default function DigitalTransformationScheduler() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
  ]

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-xl text-gray-900 dark:text-white font-bold mb-2">Digital Transformation</h2>
      <div className="flex items-center space-x-4 rtl:space-x-reverse mb-3">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-400 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clipRule="evenodd"/>
          </svg>
          <span className="text-gray-900 dark:text-white text-base font-medium">30.06.2024</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-400 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd"/>
          </svg>
          <span className="text-gray-900 dark:text-white text-base font-medium">California, USA</span>
        </div>
      </div>
      <div className="flex items-start space-x-4 rtl:space-x-reverse mb-5">
        <div>
          <div className="text-base font-normal text-gray-500 dark:text-gray-400 mb-2">Participants</div>
          <div className="flex -space-x-4 rtl:space-x-reverse">
            <img className="w-8 h-8 border border-white rounded-full dark:border-gray-800" src="/placeholder.svg?height=32&width=32" alt=""/>
            <img className="w-8 h-8 border border-white rounded-full dark:border-gray-800" src="/placeholder.svg?height=32&width=32" alt=""/>
            <img className="w-8 h-8 border border-white rounded-full dark:border-gray-800" src="/placeholder.svg?height=32&width=32" alt=""/>
            <a className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
          </div>
        </div>
        <div>
          <div className="text-base font-normal text-gray-500 dark:text-gray-400 mb-3">Duration</div>
          <span className="text-gray-900 dark:text-white text-base font-medium block">30 min</span>
        </div>
        <div>
          <div className="text-base font-normal text-gray-500 dark:text-gray-400 mb-3">Meeting Type</div>
          <span className="text-gray-900 dark:text-white text-base font-medium block">Web conference</span>
        </div>
      </div>
      <div className="pt-5 border-t border-gray-200 dark:border-gray-800 flex sm:flex-row flex-col sm:space-x-5 rtl:space-x-reverse">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="sm:ms-7 sm:ps-5 sm:border-s border-gray-200 dark:border-gray-800 w-full sm:max-w-[15rem] mt-5 sm:mt-0">
          <h3 className="text-gray-900 dark:text-white text-base font-medium mb-3 text-center">
            {date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h3>
          <Button
            variant="outline"
            className="w-full mb-5"
            onClick={() => setSelectedTime(null)}
          >
            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
            </svg>
            Pick a time
          </Button>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                className="w-full"
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}