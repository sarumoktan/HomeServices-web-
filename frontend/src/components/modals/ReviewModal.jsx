import React, { useState } from "react";
import { X, Star } from "lucide-react";

export function ReviewModal({ providerName = "Provider", onClose, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ rating, comment });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
          <h2 className="text-lg font-bold text-[#17181A]">Rate & Review {providerName}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#17181A]/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex flex-col items-center justify-center space-y-2 py-2">
            <label className="text-xs font-semibold text-[#17181A]/80 uppercase tracking-wider">Tap to Rate</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="bg-transparent border-none cursor-pointer p-1"
                >
                  <Star className={`w-8 h-8 ${star <= rating ? "text-[#E8AE3F] fill-current" : "text-black/20"}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#17181A]/80 uppercase tracking-wider mb-1.5">Your Feedback</label>
            <textarea
              required
              rows="4"
              placeholder="Describe your experience with the service provider..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-[#F7F6F2] border border-black/10 rounded-lg p-3 text-sm text-[#17181A] outline-none resize-none focus:border-[#2E4CDB]"
            ></textarea>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#17181A]/70 hover:bg-black/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#2E4CDB] hover:bg-[#233EC2] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}