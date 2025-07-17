import {NextResponse} from "next/server";
import {getHelpLineNumbers} from "@/app/libs/playwrite";


export async function GET(request: Request) {

    try {
        const helplineNumbers = getHelpLineNumbers()
        return NextResponse.json(helplineNumbers, {status: 200});
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({message: error.message}, {status: 500});
        }
        return NextResponse.json({message: 'An unknown error occurred.'}, {status: 500});
    }
}
