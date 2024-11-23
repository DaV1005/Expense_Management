import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Edit, Trash2, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const ExpensesManagement = () => {
  const [expenses, setExpenses] = useState([])
  const [formData, setFormData] = useState({ name: '', amount: '', category: '' })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/expenses', {
        withCredentials: true,
      })
      setExpenses(response.data)
    } catch (error) {
      console.error('Error fetching expenses:', error)
      setError('Error fetching expenses. Please try again.')
      toast({
        title: "Error",
        description: "Failed to fetch expenses. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.amount || !formData.category) {
      setError('Please fill in all fields.')
      return
    }

    try {
      if (editingId) {
        const response = await axios.put(`http://localhost:5555/api/expenses/${editingId}`, formData, {
          withCredentials: true,
        })
        setExpenses(expenses.map(expense => 
          expense._id === editingId ? response.data : expense
        ))
        toast({
          title: "Success",
          description: "Expense updated successfully.",
        })
      } else {
        const response = await axios.post('http://localhost:5555/api/expenses', formData, {
          withCredentials: true,
        })
        setExpenses([...expenses, response.data])
        toast({
          title: "Success",
          description: "New expense added successfully.",
        })
      }

      setFormData({ name: '', amount: '', category: '' })
      setEditingId(null)
      setError(null)
    } catch (error) {
      console.error('Error submitting expense:', error)
      setError('Error submitting expense. Please try again.')
      toast({
        title: "Error",
        description: "Failed to submit expense. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (expense) => {
    setFormData({
      name: expense.name,
      amount: expense.amount.toString(),
      category: expense.category
    })
    setEditingId(expense._id)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/api/expenses/${id}`, {
        withCredentials: true,
      })
      setExpenses(expenses.filter(expense => expense._id !== id))
      toast({
        title: "Success",
        description: "Expense deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting expense:', error)
      toast({
        title: "Error",
        description: "Failed to delete expense. Please try again.",
        variant: "destructive",
      })
    }
  }

  const prepareChartData = () => {
    const categoryTotals = {}
    expenses.forEach(expense => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount
      } else {
        categoryTotals[expense.category] = expense.amount
      }
    })
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expenses Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <Label htmlFor="name">Expense Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">
          {editingId !== null ? 'Update Expense' : 'Add Expense'}
        </Button>
      </form>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              expense: {
                label: "Expense",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={prepareChartData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {prepareChartData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
         
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {expenses.map(expense => (
          <Card key={expense._id} className="bg-yellow-100 shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-bold mb-2">{expense.name}</h3>
              <p className="mb-2">Amount: ${expense.amount.toFixed(2)}</p>
              <p className="mb-4">Category: {expense.category}</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="icon" onClick={() => handleEdit(expense)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDelete(expense._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ExpensesManagement