import {createMcpHandler} from "@vercel/mcp-adapter";
import {fetchServicesOverviewFromWebsite} from "@/app/libs/playwrite";
import {Helpline, Service} from "@/app/types/datatypes";

const allHelplineNumbers: Helpline[] = [
    {name: 'Police Helpline', phone_number: '15'},
    {name: 'Traffic Police', phone_number: '1915'},
    {name: 'Emergency Medical Service', phone_number: '1122'},
    {name: 'Anti-Corruption Establishment', phone_number: '111-223-223'},
];


async function getHelpLineNumbersFromSource(): Promise<Helpline[]> {

    return allHelplineNumbers;
}

// Helper function to simulate fetching services (replace with your actual fetch)
async function getServicesOverviewFromSource(): Promise<Service[]> {
    return fetchServicesOverviewFromWebsite("https://pkm.punjab.gov.pk/public/home/services?id=a");
}

const handler = createMcpHandler(
    server => {
        // --- Tool 1: get_helpline_numbers ---
        server.tool(
            "get_helpline_numbers",
            "Fetches helpline phone numbers for various Punjab Police and emergency services. Can filter by a specific service name.",
            {
                type: "object",
                properties: {
                    service_name: {
                        type: "string",
                        description: "Optional: The name of the specific emergency service (e.g., 'Police Helpline', 'Traffic Police', 'Emergency Medical Service', 'Anti-Corruption Establishment'). If not provided, all available helpline numbers will be returned."
                    }
                },
                required: []
            },
            async (input: { service_name?: string }) => {
                const allNumbers: Helpline[] = await getHelpLineNumbersFromSource(); // Await the data fetch

                let filteredNumbers: Helpline[] = allNumbers;

                if (input.service_name) {
                    const lowerCaseServiceName = input.service_name.toLowerCase();
                    filteredNumbers = allNumbers.filter(line =>
                        line.name.toLowerCase().includes(lowerCaseServiceName)
                    );
                }

                if (filteredNumbers.length === 0) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: input.service_name
                                    ? `No helpline number found for "${input.service_name}". Please check the service name.`
                                    : "No helpline numbers found."
                            }
                        ]
                    };
                }

                const formattedHelplines = filteredNumbers.map(
                    line => `${line.name}: ${line.phone_number}`
                ).join('\n');

                return {
                    content: [
                        {
                            type: "text",
                            text: `Here are the Punjab Police Helpline Numbers:\n${formattedHelplines}`
                        }
                    ]
                };
            }
        );

        // --- Tool 2: fetch_services_overview ---
        server.tool(
            "fetch_services_overview",
            "Fetches a summary of citizen-centric services offered by Punjab Police. Can be filtered by a specific service type.",
            {
                type: "object",
                properties: {
                    service_type: {
                        type: "string",
                        description: "Optional: The type or title of the specific service (e.g., 'Character Certificate', 'Driving License Renewal', 'Crime Reports'). If not provided, an overview of all services will be returned."
                    }
                },
                required: []
            },
            async (input: { service_type?: string }) => {
                const allAvailableServices: Service[] = await getServicesOverviewFromSource(); // Await the data fetch

                let filteredServices: Service[] = allAvailableServices;

                if (input.service_type) {
                    const lowerCaseServiceType = input.service_type.toLowerCase();
                    filteredServices = allAvailableServices.filter(service =>
                        service.title.toLowerCase().includes(lowerCaseServiceType)
                    );
                }

                if (filteredServices.length === 0) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: input.service_type
                                    ? `No service found matching "${input.service_type}". Please check the service type.`
                                    : "No services found or an error occurred during retrieval. Please try again later."
                            }
                        ]
                    };
                }

                // Format the services into a readable string for the LLM
                const formattedServices = filteredServices.map(
                    service => `Title: ${service.title}\nDescription: ${service.description}`
                ).join('\n\n---\n\n'); // Separate services with a clear divider

                return {
                    content: [
                        {
                            type: "text",
                            text: `Here's an overview of Punjab Police Services:\n\n${formattedServices}`
                        }
                    ]
                };
            }
        );
    },
    {
        // --- Capabilities for both tools ---
        capabilities: {
            tools: {
                get_helpline_numbers: {
                    description: "Fetches helpline phone numbers for various Punjab Police and emergency services. Can filter by a specific service name.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            service_name: {
                                type: "string",
                                description: "Optional: The name of the specific emergency service (e.g., 'Police Helpline', 'Traffic Police', 'Emergency Medical Service', 'Anti-Corruption Establishment')."
                            }
                        },
                        required: []
                    }
                },
                fetch_services_overview: {
                    description: "Fetches a summary of citizen-centric services offered by Punjab Police. Can be filtered by a specific service type.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            service_type: {
                                type: "string",
                                description: "Optional: The type or title of the specific service (e.g., 'Character Certificate', 'Driving License Renewal', 'Crime Reports')."
                            }
                        },
                        required: []
                    }
                }
            }
        },
    },
    {
        sseEndpoint: "/sse",
        streamableHttpEndpoint: "/mcp",
        verboseLogs: true,
        maxDuration: 60
    }
);

export {handler as GET, handler as POST, handler as DELETE};