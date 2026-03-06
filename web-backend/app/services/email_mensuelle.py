# from io import BytesIO
# from reportlab.pdfgen import canvas
# from reportlab.lib.pagesizes import A4
# from reportlab.lib.units import mm
# import secrets

# def pdf_redgister():
#     buffer=BytesIO()
#     c=canvas.Canvas(buffer,A4)
#     width,heigth=A4
#     y=heigth-20*mm

#     c.setFont('Helvetica-bold',14)
#     c.drawString(20*mm,y,'Votre nouveau mots de passe est join ci desssus ne le partager pas.')
#     y-=10*mm

#     nouveau_password=secrets.token_hex(10)
#     c.setFont('Helvetica-Bold',18)
#     c.drawString(20*mm,y,f"Nouveau mots de passe {nouveau_password}")

#     c.save()
#     buffer.seek(0)
#     return buffer
