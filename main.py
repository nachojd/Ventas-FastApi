from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import sqlite3

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

conn = sqlite3.connect("Motocenter.db")
cursor = conn.cursor()

# Define un modelo Pydantic para recibir los datos de actualización
class UpdatePriceRequest(BaseModel):
    product_id: int
    new_price: float


@app.get("/productos", response_class=HTMLResponse)
async def get_html(request: Request):
    query = "SELECT COD_SCANNER, NOMBRE, PRECIO_VENTA1 FROM producto"
    productos = cursor.execute(query).fetchall()
    return templates.TemplateResponse("productos.html", {"request": request, "productos": productos})
