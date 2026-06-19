import StackedPanels from './StackedPanels'

export default function Tours() {
  return (
    <section id="circuit" className="py-24" data-reveal="fade" style={{ backgroundColor: '#000000' }}>
      <div id="visite" style={{ position: 'relative', top: '-80px' }} />
      <StackedPanels />
    </section>
  )
}
