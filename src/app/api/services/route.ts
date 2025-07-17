import {NextResponse} from "next/server";
import {fetchServicesOverviewFromWebsite} from "@/app/libs/playwrite";

export async function GET(request: Request) {
    try {
        const services = await fetchServicesOverviewFromWebsite("https://pkm.punjab.gov.pk/public/home/services?id=a");
        return NextResponse.json(services, {status: 200});
    } catch (error: unknown) { // Change 'any' to 'unknown'
        if (error instanceof Error) {
            return NextResponse.json({message: error.message}, {status: 500});
        }
        return NextResponse.json({message: 'An unknown error occurred.'}, {status: 500});
    }
}