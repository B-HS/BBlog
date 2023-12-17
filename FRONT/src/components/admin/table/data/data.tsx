import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircleIcon,
    CircleDashedIcon,
    CircleIcon,
    ShieldQuestionIcon,
    WatchIcon,
} from 'lucide-react'

export const labels = [
    {
        value: 'bug',
        label: 'Bug',
    },
    {
        value: 'feature',
        label: 'Feature',
    },
    {
        value: 'documentation',
        label: 'Documentation',
    },
]

export const statuses = [
    {
        value: 'backlog',
        label: 'Backlog',
        icon: ShieldQuestionIcon,
    },
    {
        value: 'todo',
        label: 'Todo',
        icon: CircleIcon,
    },
    {
        value: 'in progress',
        label: 'In Progress',
        icon: WatchIcon,
    },
    {
        value: 'done',
        label: 'Done',
        icon: CheckCircleIcon,
    },
    {
        value: 'canceled',
        label: 'Canceled',
        icon: CircleDashedIcon,
    },
]

export const priorities = [
    {
        label: 'Low',
        value: 'low',
        icon: ArrowDownIcon,
    },
    {
        label: 'Medium',
        value: 'medium',
        icon: ArrowRightIcon,
    },
    {
        label: 'High',
        value: 'high',
        icon: ArrowUpIcon,
    },
]
