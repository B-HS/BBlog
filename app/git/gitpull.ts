import { execSync } from 'child_process'
import { redirect } from 'next/navigation'

export const pullingFilesByGit = async (formData: FormData) => {
    'use server'
    const password = formData.get('password') as string
    if (password === process.env.PULL_PW) {
        const output = execSync('git pull', { encoding: 'utf-8' })
        console.log('Git pulled')
        return redirect('/git?isSuccess=true&message=' + JSON.stringify(output))
    }
    return redirect('/git?isSuccess=false&message=Wrong password')
}

export const msgParser = (output: string) => {
    const splitted = JSON.parse(output).split(/\r?\n/) as string[]
    return splitted.filter((e) => {
        return e !== ''
    })
}
