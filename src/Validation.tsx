import { z } from "zod";
export const transactionSchema = z.object({
  id: z.number(),
  senderName: z.string().min(1, "Sender Name is required"),
  receiverName: z.string().min(1, "Receiver Name is required"),
  amount: z.number().positive("Amount must be greater than zero"),
  status: z.enum(["Pending", "Completed", "Failed"]),
  timestamp: z.string(),
});

