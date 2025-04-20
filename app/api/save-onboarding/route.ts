import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Create a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `onboarding-data-${timestamp}.json`;

    // In a real application, you would save this to a database or cloud storage
    // For this example, we'll save it to the server's file system
    // Note: In production, you'd use a more robust storage solution
    const filePath = path.join(process.cwd(), "public", "data", filename);

    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the data to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      message: "Onboarding data saved successfully",
      filename,
    });
  } catch (error) {
    console.error("Error saving onboarding data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save onboarding data" },
      { status: 500 }
    );
  }
}
