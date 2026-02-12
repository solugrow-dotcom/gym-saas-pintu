"use client";

import { useState } from "react";
import { Utensils, Loader2, Save, Printer, Leaf, Beef, Sandwich, Flame } from "lucide-react";
import clsx from "clsx";

interface DietPlan {
    type: string;
    calories: number;
    macros: {
        protein: string;
        carbs: string;
        fats: string;
    };
    meals: {
        time: string;
        name: string;
        items: string[];
    }[];
}

export default function DietPage() {
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState<DietPlan | null>(null);

    const [formData, setFormData] = useState({
        memberName: "",
        currentWeight: "",
        goal: "weight_loss",
        preference: "veg", // veg, non_veg, vegan, keto
    });

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setPlan(null);

        // Simulate AI generation delay
        setTimeout(() => {
            const generatedPlan = generateMockDiet(formData.goal, formData.preference);
            setPlan(generatedPlan);
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                    <Utensils className="w-8 h-8 text-green-500" />
                    AI Diet Planner
                </h1>
                <p className="text-gray-400">Generate personalized meal plans based on dietary preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-6 rounded-2xl border border-white/10 bg-black/50">
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Member Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                                    placeholder="e.g. Priya Sharma"
                                    value={formData.memberName}
                                    onChange={e => setFormData({ ...formData, memberName: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Current Weight (kg)</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                                        placeholder="70"
                                        value={formData.currentWeight}
                                        onChange={e => setFormData({ ...formData, currentWeight: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Target</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                                        value={formData.goal}
                                        onChange={e => setFormData({ ...formData, goal: e.target.value })}
                                    >
                                        <option value="weight_loss">Lose Fat</option>
                                        <option value="muscle_gain">Build Muscle</option>
                                        <option value="maintain">Maintain</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-3">Dietary Preference</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { id: "veg", label: "Veg", icon: Leaf },
                                        { id: "non_veg", label: "Non-Veg", icon: Beef },
                                        { id: "vegan", label: "Vegan", icon: Leaf },
                                        { id: "keto", label: "Keto", icon: Flame },
                                    ].map((type) => (
                                        <button
                                            key={type.id}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, preference: type.id })}
                                            className={clsx(
                                                "p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all",
                                                formData.preference === type.id
                                                    ? "bg-green-500/20 border-green-500 text-green-500"
                                                    : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10"
                                            )}
                                        >
                                            <type.icon className="w-5 h-5" />
                                            <span className="text-xs font-bold">{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:shadow-lg hover:shadow-green-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Cooking Plan...
                                    </>
                                ) : (
                                    <>
                                        <Utensils className="w-5 h-5" />
                                        Generate Diet
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Output Display */}
                <div className="lg:col-span-2">
                    {plan ? (
                        <div className="glass-card rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                            <div className="p-6 border-b border-white/5 flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-1">Nutrition Plan for {formData.memberName}</h2>
                                    <div className="flex gap-2 items-center">
                                        <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-green-400 capitalize flex items-center gap-1">
                                            <Flame className="w-3 h-3" /> {plan.calories} kcal
                                        </span>
                                        <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400 capitalize">{formData.preference.replace("_", "-")}</span>
                                        <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-400 capitalize">{formData.goal.replace("_", " ")}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" title="Print">
                                        <Printer className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" title="Save">
                                        <Save className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Macros & Plan */}
                            <div className="p-6 space-y-8">
                                {/* Macros Grid */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                                        <p className="text-xs text-blue-400 uppercase font-bold tracking-wider mb-1">Protein</p>
                                        <p className="text-xl font-bold text-white">{plan.macros.protein}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
                                        <p className="text-xs text-yellow-400 uppercase font-bold tracking-wider mb-1">Carbs</p>
                                        <p className="text-xl font-bold text-white">{plan.macros.carbs}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20 text-center">
                                        <p className="text-xs text-pink-400 uppercase font-bold tracking-wider mb-1">Fats</p>
                                        <p className="text-xl font-bold text-white">{plan.macros.fats}</p>
                                    </div>
                                </div>

                                {/* Meal Timeline */}
                                <div className="space-y-6 relative">
                                    <div className="absolute left-[19px] top-4 bottom-4 w-px bg-white/10" />

                                    {plan.meals.map((meal, idx) => (
                                        <div key={idx} className="relative pl-12">
                                            <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center z-10">
                                                <Sandwich className="w-4 h-4 text-green-500" />
                                            </div>

                                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-green-500/30 transition-colors">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h3 className="text-lg font-bold text-white">{meal.name}</h3>
                                                    <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">{meal.time}</span>
                                                </div>
                                                <ul className="space-y-1">
                                                    {meal.items.map((item, i) => (
                                                        <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/10 rounded-2xl">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <Utensils className="w-10 h-10 text-gray-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-300">Ready to Plan</h3>
                            <p className="text-gray-500 max-w-sm">
                                Enter user details and preferences to generate a smart nutritious diet plan.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function generateMockDiet(goal: string, preference: string): DietPlan {
    const isVeg = preference === "veg" || preference === "vegan";
    const isMuscle = goal === "muscle_gain";

    return {
        type: preference,
        calories: isMuscle ? 2800 : 1800,
        macros: {
            protein: isMuscle ? "180g" : "120g",
            carbs: isMuscle ? "350g" : "150g",
            fats: isMuscle ? "80g" : "60g",
        },
        meals: [
            {
                name: "Breakfast",
                time: "8:00 AM",
                items: isVeg
                    ? ["Oats with Almond Milk & Berries", "2 Boiled Eggs (or Tofu Scramble)", "Green Tea"]
                    : ["3 Egg Omelette with Spinach", "Whole Wheat Toast (2 slices)", "Black Coffee"]
            },
            {
                name: "Lunch",
                time: "1:00 PM",
                items: isVeg
                    ? ["Paneer Tikka / Tofu Curry", "1 Cup Brown Rice", "Mixed Green Salad", "Curd"]
                    : ["Grilled Chicken Breast (150g)", "Quinoa or Sweet Potato", "Steamed Broccoli"]
            },
            {
                name: "Pre-Workout Snack",
                time: "5:00 PM",
                items: ["1 Banana", "Peanut Butter Toast", "Black Coffee"]
            },
            {
                name: "Dinner",
                time: "8:30 PM",
                items: isVeg
                    ? ["Lentil Soup (Dal)", "Grilled Vegetables", "1 Multigrain Roti"]
                    : ["Baked Fish or Lean Meat", "Asparagus/Beans", "Light Soup"]
            }
        ]
    };
}
