// Date Time Picker Types

export interface DateTimePickerValue {
  date: Date
  time: string
  timezone: string
}

export interface PostingSlot {
  id: string
  time: string
  label: string
}

export interface DateTimePickerProps {
  value?: DateTimePickerValue | undefined
  onChange?: (value: DateTimePickerValue) => void
  postingSlots?: PostingSlot[]
  timezone?: string
  disabled?: boolean
}