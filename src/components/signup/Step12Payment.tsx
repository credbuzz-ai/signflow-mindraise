
import React, { useState } from 'react';
import { useSignup, PaymentMethod } from '@/contexts/SignupContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, CalendarDays, ShieldCheck, CheckCircle } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const Step12Payment: React.FC = () => {
  const { signupData, updateSignupData, resetSignup } = useSignup();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Pre-populate form if payment method exists
  const defaultValues: PaymentMethod = signupData.paymentMethod || {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  };
  
  const form = useForm<PaymentMethod>({
    defaultValues
  });
  
  const handleSubmit = (data: PaymentMethod) => {
    if (data.cardNumber.replace(/\s/g, '').length !== 16) {
      toast({
        title: "Invalid card number",
        description: "Please enter a valid 16-digit card number",
        variant: "destructive"
      });
      return;
    }
    
    if (!data.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      toast({
        title: "Invalid expiry date",
        description: "Please enter expiry date in MM/YY format",
        variant: "destructive"
      });
      return;
    }
    
    if (data.cvv.length < 3) {
      toast({
        title: "Invalid CVV",
        description: "Please enter a valid CVV code",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateSignupData({ paymentMethod: data });
      
      toast({
        title: "Registration complete!",
        description: "Your creator profile has been set up successfully."
      });
      
      // Reset and redirect to dashboard
      resetSignup();
      window.location.href = '/dashboard';
      
      setIsLoading(false);
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Add a space after every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };
  
  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Add a slash after the first 2 digits
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    form.setValue('cardNumber', formatted);
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    form.setValue('expiryDate', formatted);
  };

  const handleGoBack = () => {
    updateSignupData({ 
      paymentMethod: form.getValues()
    });
    window.history.back();
  };

  return (
    <div>
      <div className="space-y-6 mb-8">
        <div className="flex items-center p-4 rounded-lg bg-green-50 text-green-700 text-sm mb-4">
          <ShieldCheck className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>Your payment information is securely stored and only charged when you receive orders</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nameOnCard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Smith" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        {...field}
                        placeholder="1234 5678 9012 3456" 
                        className="pl-10"
                        maxLength={19}
                        onChange={handleCardNumberChange}
                      />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          {...field}
                          placeholder="MM/YY" 
                          className="pl-10"
                          maxLength={5}
                          onChange={handleExpiryDateChange}
                        />
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        type="password" 
                        placeholder="•••" 
                        maxLength={4}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-signup hover:opacity-90 mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="mr-2">Processing...</span>
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="mr-2">Complete Sign-up</span>
                  <CheckCircle className="h-5 w-5" />
                </span>
              )}
            </Button>
          </form>
        </Form>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGoBack}
        className="w-full"
        disabled={isLoading}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <p className="mt-6 text-center text-sm text-gray-500">
        By completing sign-up, you agree to our{" "}
        <a href="/terms" className="font-medium text-primary hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="font-medium text-primary hover:underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default Step12Payment;
