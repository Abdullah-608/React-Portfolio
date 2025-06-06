import { useState, useRef, useEffect } from "react";
import {  motion,AnimatePresence } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Check, 
  Calendar, 
  Clock, 
  Loader2, 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const InputField = ({ label, id, type = "text", placeholder, required = true, icon, maxLength, textarea = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  
  const validate = () => {
    if (required && !value) {
      setError(`${label} is required`);
      return false;
    }
    
    if (type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    setError("");
    return true;
  };
  
  const Component = textarea ? "textarea" : "input";
  
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center text-sm font-medium text-foreground mb-1">
        {icon && <span className="mr-2 text-primary/70">{icon}</span>}
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <Component
          type={type}
          id={id}
          name={id}
          required={required}
          rows={textarea ? 5 : undefined}
          maxLength={maxLength}
          className={cn(
            "w-full px-4 py-3 rounded-lg border text-foreground placeholder-muted-foreground/70 transition-all duration-200 bg-background/60",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
            "hover:border-primary/30 hover:bg-background/80",
            textarea ? "resize-none" : "",
            error ? "border-red-500/50 focus:ring-red-500/30 focus:border-red-500/50" : "border-border",
            isFocused ? "bg-background shadow-sm" : ""
          )}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            validate();
          }}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        
        {maxLength && textarea && (
          <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-red-500 text-sm mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const SocialLink = ({ href, icon, label, color }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2.5 rounded-full flex items-center justify-center transition-all duration-300 ${color} hover:bg-primary/10 hover:text-primary`}
    whileHover={{ y: -3, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    {icon}
  </motion.a>
);

export const ContactSection = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
  });
  const formRef = useRef(null);
  const mapRef = useRef(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the entire form before submission
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    
    if (!name || !email || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setFormState({ isSubmitting: true, isSuccess: false, isError: false });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormState({ isSubmitting: false, isSuccess: true, isError: false });
      
      toast({
        title: (
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <span>Message sent successfully!</span>
          </div>
        ),
        description: "Thank you for your message. I'll get back to you as soon as possible.",
        variant: "default",
      });
      
      // Reset form after successful submission
      formRef.current.reset();
      
      // Reset success state after a delay
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSuccess: false }));
      }, 3000);
      
    } catch (error) {
      setFormState({ isSubmitting: false, isSuccess: false, isError: true });
      
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Interactive map initialization
  useEffect(() => {
    if (mapRef.current) {
      // This would be where you initialize a map library like Mapbox or Google Maps
      // For now, we'll just add a placeholder
      const mapPlaceholder = document.createElement('div');
      mapPlaceholder.className = 'h-full w-full bg-primary/5 rounded-lg flex items-center justify-center';
      mapPlaceholder.innerHTML = '<span class="text-primary/70">Interactive Map</span>';
      mapRef.current.appendChild(mapPlaceholder);
    }
  }, []);

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-background -z-10"></div>
      <div className="absolute -top-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight inline-block">
            Get In <span className="text-primary">Touch</span>
            <motion.div 
              className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 mt-2 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: '100%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </h2>
          <motion.p 
            className="text-center text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a project in mind or want to collaborate? I'm excited to hear from you. 
            Let's create something amazing together.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact information column */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-semibold relative inline-block">
                Contact Information
                <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary/40"></div>
              </h3>
              
              <motion.div 
                className="mt-8 space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
                variants={{
                  visible: { transition: { staggerChildren: 0.12 } },
                  hidden: {}
                }}
              >
                <ContactItem 
                  icon={<Mail className="h-5 w-5" />} 
                  title="Email" 
                  value="abdullahmansoor608@gmail.com" 
                  link="mailto:abdullahmansoor608@gmail.com" 
                />
                <ContactItem 
                  icon={<Phone className="h-5 w-5" />} 
                  title="Phone" 
                  value="+92 (318) 0472279" 
                  link="tel:+923180472279" 
                />
                <ContactItem 
                  icon={<MapPin className="h-5 w-5" />} 
                  title="Location" 
                  value="Shahdara, Lahore, Pakistan☪️" 
                />
                <ContactItem 
                  icon={<Calendar className="h-5 w-5" />} 
                  title="Availability" 
                  value="Monday - Friday" 
                />
                <ContactItem 
                  icon={<Clock className="h-5 w-5" />} 
                  title="Working Hours" 
                  value="9:00 AM - 6:00 PM (PKT)" 
                />
              </motion.div>
              
             
              
              {/* Small map */}
              <div className="mt-8 rounded-xl overflow-hidden border border-border h-40 shadow-sm" ref={mapRef}></div>
            </div>
          </motion.div>

          {/* Contact form column */}
          <motion.div 
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-xl -z-10"></div>
              
              <div className="bg-card/80 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-xl border border-border/50 relative z-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                
                <h3 className="text-2xl md:text-3xl font-semibold mb-8 relative inline-block">
                  Send a Message
                  <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary/40"></div>
                </h3>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <InputField 
                    label="Full Name" 
                    id="name" 
                    placeholder="Your name..." 
                    icon={<span className="h-4 w-4">👤</span>}
                  />
                  
                  <InputField 
                    label="Email Address" 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    icon={<span className="h-4 w-4">✉️</span>}
                  />
                  
                  <InputField 
                    label="Message" 
                    id="message" 
                    placeholder="Tell me about your project or idea..." 
                    textarea={true}
                    maxLength={500}
                    icon={<span className="h-4 w-4">💬</span>}
                  />
                  
                  <motion.button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className={cn(
                      "w-full mt-4 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-primary-foreground font-medium",
                      "transition-all duration-300 shadow-md",
                      "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1",
                      formState.isSuccess ? 
                        "bg-green-500 hover:bg-green-600" : 
                        "bg-primary hover:bg-primary/90",
                      formState.isSubmitting || formState.isSuccess ? 
                        "opacity-90 cursor-not-allowed" : 
                        "hover:shadow-lg hover:scale-[1.01]"
                    )}
                    whileHover={{ scale: formState.isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: formState.isSubmitting ? 1 : 0.98 }}
                  >
                    {formState.isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : formState.isSuccess ? (
                      <>
                        <Check size={18} />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} className="ml-1" />
                      </>
                    )}
                  </motion.button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    I typically respond within 24-48 hours during business days.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact information item with animation
const ContactItem = ({ icon, title, value, link }) => {
  return (
    <motion.div 
      className="flex items-start space-x-4 group"
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
      }}
    >
      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors text-primary flex-shrink-0 mt-1">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        {link ? (
          <a
            href={link}
            className="text-muted-foreground hover:text-primary transition-colors duration-200 block"
          >
            {value}
          </a>
        ) : (
          <span className="text-muted-foreground block">{value}</span>
        )}
      </div>
    </motion.div>
  );
};