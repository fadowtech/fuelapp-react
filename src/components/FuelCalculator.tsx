import React, { useState } from 'react';
import { Calculator, Fuel, MapPin, DollarSign, Gauge, Car } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const FuelCalculator = () => {
  // Fuel Efficiency Calculator State
  const [distance, setDistance] = useState('');
  const [fuelUsed, setFuelUsed] = useState('');
  const [efficiency, setEfficiency] = useState<number | null>(null);

  // Cost Calculator State
  const [tripDistance, setTripDistance] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [vehicleEfficiency, setVehicleEfficiency] = useState('');
  const [tripCost, setTripCost] = useState<number | null>(null);

  // Fuel Needed Calculator State
  const [plannedDistance, setPlannedDistance] = useState('');
  const [carEfficiency, setCarEfficiency] = useState('');
  const [fuelPricePerLiter, setFuelPricePerLiter] = useState('');
  const [fuelNeeded, setFuelNeeded] = useState<number | null>(null);
  const [totalFuelCost, setTotalFuelCost] = useState<number | null>(null);

  // Distance Calculator State
  const [availableFuel, setAvailableFuel] = useState('');
  const [kmPerLiter, setKmPerLiter] = useState('');
  const [maxDistance, setMaxDistance] = useState<number | null>(null);

  const calculateEfficiency = () => {
    const dist = parseFloat(distance);
    const fuel = parseFloat(fuelUsed);
    
    if (dist > 0 && fuel > 0) {
      const eff = dist / fuel;
      setEfficiency(Math.round(eff * 100) / 100);
    }
  };

  const calculateTripCost = () => {
    const dist = parseFloat(tripDistance);
    const price = parseFloat(fuelPrice);
    const eff = parseFloat(vehicleEfficiency);
    
    if (dist > 0 && price > 0 && eff > 0) {
      const fuelRequired = dist / eff;
      const cost = fuelRequired * price;
      setTripCost(Math.round(cost * 100) / 100);
    }
  };

  const calculateFuelNeeded = () => {
    const dist = parseFloat(plannedDistance);
    const eff = parseFloat(carEfficiency);
    const price = parseFloat(fuelPricePerLiter);
    
    if (dist > 0 && eff > 0) {
      const fuel = dist / eff;
      setFuelNeeded(Math.round(fuel * 100) / 100);
      
      // Calculate total cost if price is provided
      if (price > 0) {
        const cost = fuel * price;
        setTotalFuelCost(Math.round(cost * 100) / 100);
      } else {
        setTotalFuelCost(null);
      }
    }
  };

  const calculateMaxDistance = () => {
    const fuel = parseFloat(availableFuel);
    const eff = parseFloat(kmPerLiter);
    
    if (fuel > 0 && eff > 0) {
      const dist = fuel * eff;
      setMaxDistance(Math.round(dist * 100) / 100);
    }
  };

  const ResultCard = ({ title, value, unit, icon: Icon, color }: {
    title: string;
    value: number | null;
    unit: string;
    icon: any;
    color: string;
  }) => (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <span className={`text-2xl font-bold ${color}`}>
                {value !== null ? value.toLocaleString() : '--'}
              </span>
              <span className="text-sm text-muted-foreground">{unit}</span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('600', '100')}`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full">
              <Fuel className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Fuel Calculator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate fuel efficiency, trip costs, and plan your journeys with precision
          </p>
        </div>

        {/* Calculator Tabs */}
        <Tabs defaultValue="efficiency" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="efficiency" className="flex items-center space-x-2">
              <Gauge className="h-4 w-4" />
              <span className="hidden sm:inline">Efficiency</span>
            </TabsTrigger>
            <TabsTrigger value="cost" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Trip Cost</span>
            </TabsTrigger>
            <TabsTrigger value="fuel" className="flex items-center space-x-2">
              <Fuel className="h-4 w-4" />
              <span className="hidden sm:inline">Fuel Needed</span>
            </TabsTrigger>
            <TabsTrigger value="distance" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Max Distance</span>
            </TabsTrigger>
          </TabsList>

          {/* Fuel Efficiency Calculator */}
          <TabsContent value="efficiency">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gauge className="h-5 w-5 text-blue-600" />
                    <span>Fuel Efficiency Calculator</span>
                  </CardTitle>
                  <CardDescription>
                    Calculate how many kilometers you can travel per liter of fuel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance Traveled (KM)</Label>
                    <Input
                      id="distance"
                      type="number"
                      placeholder="Enter distance in kilometers"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fuel">Fuel Used (Liters)</Label>
                    <Input
                      id="fuel"
                      type="number"
                      placeholder="Enter fuel consumed in liters"
                      value={fuelUsed}
                      onChange={(e) => setFuelUsed(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <Button 
                    onClick={calculateEfficiency} 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    size="lg"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Efficiency
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <ResultCard
                  title="Fuel Efficiency"
                  value={efficiency}
                  unit="KM/L"
                  icon={Gauge}
                  color="text-blue-600"
                />
                
                {efficiency && (
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Efficiency Rating
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-green-700">
                        {efficiency >= 15 ? "Excellent fuel efficiency! 🌟" :
                         efficiency >= 12 ? "Good fuel efficiency 👍" :
                         efficiency >= 8 ? "Average fuel efficiency" :
                         "Consider optimizing your driving habits"}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Trip Cost Calculator */}
          <TabsContent value="cost">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span>Trip Cost Calculator</span>
                  </CardTitle>
                  <CardDescription>
                    Calculate the total fuel cost for your journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tripDistance">Trip Distance (KM)</Label>
                    <Input
                      id="tripDistance"
                      type="number"
                      placeholder="Enter trip distance"
                      value={tripDistance}
                      onChange={(e) => setTripDistance(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fuelPrice">Fuel Price per Liter</Label>
                    <Input
                      id="fuelPrice"
                      type="number"
                      placeholder="Enter fuel price per liter"
                      value={fuelPrice}
                      onChange={(e) => setFuelPrice(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vehicleEfficiency">Vehicle Efficiency (KM/L)</Label>
                    <Input
                      id="vehicleEfficiency"
                      type="number"
                      placeholder="Enter your vehicle's efficiency"
                      value={vehicleEfficiency}
                      onChange={(e) => setVehicleEfficiency(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <Button 
                    onClick={calculateTripCost} 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    size="lg"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Cost
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <ResultCard
                  title="Trip Cost"
                  value={tripCost}
                  unit="₹"
                  icon={DollarSign}
                  color="text-green-600"
                />
                
                {tripCost && (
                  <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Trip Details
                        </Badge>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p>• Fuel needed: {(parseFloat(tripDistance) / parseFloat(vehicleEfficiency)).toFixed(2)} L</p>
                          <p>• Cost per KM: ₹{(tripCost / parseFloat(tripDistance)).toFixed(2)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Fuel Needed Calculator */}
          <TabsContent value="fuel">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Fuel className="h-5 w-5 text-orange-600" />
                    <span>Fuel Required Calculator</span>
                  </CardTitle>
                  <CardDescription>
                    Calculate how much fuel you need for a specific distance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="plannedDistance">Planned Distance (KM)</Label>
                    <Input
                      id="plannedDistance"
                      type="number"
                      placeholder="Enter planned distance"
                      value={plannedDistance}
                      onChange={(e) => setPlannedDistance(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="carEfficiency">Vehicle Efficiency (KM/L)</Label>
                    <Input
                      id="carEfficiency"
                      type="number"
                      placeholder="Enter your vehicle's efficiency"
                      value={carEfficiency}
                      onChange={(e) => setCarEfficiency(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fuelPricePerLiter">Fuel Price per Liter (Optional)</Label>
                    <Input
                      id="fuelPricePerLiter"
                      type="number"
                      placeholder="Enter fuel price per liter"
                      value={fuelPricePerLiter}
                      onChange={(e) => setFuelPricePerLiter(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <Button 
                    onClick={calculateFuelNeeded} 
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    size="lg"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Fuel Needed
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <ResultCard
                  title="Fuel Required"
                  value={fuelNeeded}
                  unit="Liters"
                  icon={Fuel}
                  color="text-orange-600"
                />
                
                {totalFuelCost && (
                  <ResultCard
                    title="Total Amount"
                    value={totalFuelCost}
                    unit="₹"
                    icon={DollarSign}
                    color="text-green-600"
                  />
                )}
                
                {fuelNeeded && fuelPricePerLiter && (
                  <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          Cost Breakdown
                        </Badge>
                        <div className="text-sm text-orange-700 space-y-1">
                          <p>• Fuel needed: {fuelNeeded} L</p>
                          <p>• Price per liter: ₹{parseFloat(fuelPricePerLiter).toFixed(2)}</p>
                          <p>• Total cost: ₹{totalFuelCost}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Maximum Distance Calculator */}
          <TabsContent value="distance">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <span>Maximum Distance Calculator</span>
                  </CardTitle>
                  <CardDescription>
                    Calculate how far you can travel with available fuel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="availableFuel">Available Fuel (Liters)</Label>
                    <Input
                      id="availableFuel"
                      type="number"
                      placeholder="Enter available fuel"
                      value={availableFuel}
                      onChange={(e) => setAvailableFuel(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="kmPerLiter">Vehicle Efficiency (KM/L)</Label>
                    <Input
                      id="kmPerLiter"
                      type="number"
                      placeholder="Enter your vehicle's efficiency"
                      value={kmPerLiter}
                      onChange={(e) => setKmPerLiter(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <Button 
                    onClick={calculateMaxDistance} 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    size="lg"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Max Distance
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <ResultCard
                  title="Maximum Distance"
                  value={maxDistance}
                  unit="KM"
                  icon={MapPin}
                  color="text-purple-600"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Tips */}
        <Card className="bg-gradient-to-r from-slate-50 to-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Car className="h-5 w-5 text-slate-600" />
              <span>Fuel Efficiency Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-600">
              <div className="space-y-1">
                <p className="font-medium">🚗 Driving Habits</p>
                <p>Maintain steady speeds and avoid aggressive acceleration</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">🔧 Vehicle Maintenance</p>
                <p>Regular servicing and proper tire pressure improve efficiency</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">🛣️ Route Planning</p>
                <p>Use GPS to find the most efficient routes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FuelCalculator;
