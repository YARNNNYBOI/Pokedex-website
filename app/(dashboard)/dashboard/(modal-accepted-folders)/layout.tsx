export default function MyTeamLayout({
    children,
    modal,
}:{
    children: React.ReactNode;
    modal: React.ReactNode;
}){
    return (
    <>
          {modal}
      {children}

    </>
    );
}