export class AcademiModel {
    public id: 20001;
    public examId: 1001;
    public examName: "EXAMEN NOMBRE";
    public examTypeId: 1;
    public examTypeName: "EXAMEN TIPO";
    public statusId: 1;
    public statusName: "PENDIENTE";
    public time: 30;
    public examDate: "24/02/2019";
    public questions?;
}

export class CursospModel {
    id: number;
    title: string;
    totalSteps: number;
    time: number;
}
export class PreguntaDescripModel {
    public id: 2000111;
    public description: "¡.........,  ........?";
    public type: "CBBX";
    public image: "https://s3.amazonaws.com/imagenessofia/imagen1.jpg";
    public alternatives?;
}
