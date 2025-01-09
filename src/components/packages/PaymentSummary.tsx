import { Card, CardContent } from "@/components/ui/card";
import { Package } from "@/types/package";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface PaymentSummaryProps {
  packages: Package[];
  title: string;
}

const PaymentSummary = ({ packages, title }: PaymentSummaryProps) => {
  const [paymentType, setPaymentType] = useState("full");
  const [monthlyTerm, setMonthlyTerm] = useState("48");
  const [downPayment, setDownPayment] = useState("500.00");

  const totalCost = packages.reduce((sum, pkg) => sum + pkg.price, 0);
  const discount = title === "Platinum" ? 800 : title === "Gold" ? 500 : 0;
  const finalCost = totalCost - discount;

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <Select value={paymentType} onValueChange={setPaymentType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Payment</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="text-right text-sm">
              <p className="text-gray-600">Subtotal: ${totalCost.toFixed(2)}</p>
              <p className="text-gray-600">Discount: -${discount.toFixed(2)}</p>
              <p className="font-bold">Total: ${finalCost.toFixed(2)}</p>
            </div>
          </div>

          {paymentType === "finance" && (
            <div className="space-y-2">
              <Select value={monthlyTerm} onValueChange={setMonthlyTerm}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="48">48 Months @ 4.99%</SelectItem>
                  <SelectItem value="36">36 Months @ 4.49%</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Down Payment:</span>
                <Input
                  type="text"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-[120px]"
                />
              </div>
              <div className="text-sm text-gray-600">
                <p>Monthly: ${(finalCost / parseInt(monthlyTerm)).toFixed(2)}</p>
                <p className="text-xs">On Approved Credit</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;